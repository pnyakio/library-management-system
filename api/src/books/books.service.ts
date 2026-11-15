import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { CreateBookDto } from './dto/create-book.dto.js';
import { UpdateBookDto } from './dto/update-book.dto.js';

@Injectable()
export class BooksService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateBookDto) {
    try {
      return await this.prisma.book.create({
        data: {
          ...data,
          availableCopies: data.totalCopies,
        },
        include: { genre: true },
      });
    } catch (error) {
      if (
        error &&
        typeof error === 'object' &&
        'code' in error &&
        error.code === 'P2002'
      ) {
        throw new ConflictException('A book with this ISBN already exists');
      }
      throw error;
    }
  }

  async findAll(
    genreId?: number,
    search?: string,
    page = 1,
    limit = 10,
  ) {
    const where = {
      ...(genreId ? { genreId } : {}),
      ...(search
        ? {
            OR: [
              { title: { contains: search, mode: 'insensitive' as const } },
              { author: { contains: search, mode: 'insensitive' as const } },
            ],
          }
        : {}),
    };

    const [books, total] = await Promise.all([
      this.prisma.book.findMany({
        where,
        skip: (page - 1) * limit,
        take: limit,
        include: { genre: true },
      }),
      this.prisma.book.count({ where }),
    ]);

    return {
      data: books,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  async findOne(id: number) {
    const book = await this.prisma.book.findUnique({
      where: { id },
      include: { genre: true },
    });

    if (!book) {
      throw new NotFoundException(`Book with ID ${id} not found`);
    }

    return book;
  }

  async update(id: number, data: UpdateBookDto) {
    await this.findOne(id);

    try {
      return await this.prisma.book.update({
        where: { id },
        data,
        include: { genre: true },
      });
    } catch (error) {
      if (
        error &&
        typeof error === 'object' &&
        'code' in error &&
        error.code === 'P2002'
      ) {
        throw new ConflictException('A book with this ISBN already exists');
      }
      throw error;
    }
  }

  async remove(id: number) {
    await this.findOne(id);

    return this.prisma.book.delete({
      where: { id },
    });
  }
}