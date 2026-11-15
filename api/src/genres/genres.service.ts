import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';

@Injectable()
export class GenresService {
  constructor(private prisma: PrismaService) {}

  async create(data: { name: string; slug: string }) {
    try {
      return await this.prisma.genre.create({
        data,
      });
    } catch (error) {
      if (
        error &&
        typeof error === 'object' &&
        'code' in error &&
        error.code === 'P2002'
      ) {
        throw new ConflictException('Genre already exists');
      }
      throw error;
    }
  }

  async findAll() {
    return this.prisma.genre.findMany({
      include: { _count: { select: { books: true } } },
    });
  }

  async findOne(id: number) {
    const genre = await this.prisma.genre.findUnique({
      where: { id },
      include: { books: true },
    });

    if (!genre) {
      throw new NotFoundException(`Genre with ID ${id} not found`);
    }

    return genre;
  }

  async update(id: number, data: { name?: string; slug?: string }) {
    await this.findOne(id);

    try {
      return await this.prisma.genre.update({
        where: { id },
        data,
      });
    } catch (error) {
      if (
        error &&
        typeof error === 'object' &&
        'code' in error &&
        error.code === 'P2002'
      ) {
        throw new ConflictException('Genre name or slug already exists');
      }
      throw error;
    }
  }

  async remove(id: number) {
    await this.findOne(id);

    return this.prisma.genre.delete({
      where: { id },
    });
  }
}