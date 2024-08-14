import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './tasks.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

interface GetTasksOptions {
    status?: string;
    page: number;
    limit: number;
    sort: string;
}

@Injectable()
export class TasksService {
    constructor(
        @InjectRepository(Task)
        private tasksRepository: Repository<Task>,
    ) {}

    async findAll({ status, page, limit, sort }: GetTasksOptions): Promise<{ tasks: Task[], total: number }> {
        const query = this.tasksRepository.createQueryBuilder('task');

        if (status && status !== 'all') {
            query.andWhere('task.status = :status', { status });
        }

        const [tasks, total] = await query
            .orderBy(`task.${sort}`, 'ASC')
            .skip((page - 1) * limit)
            .take(limit)
            .getManyAndCount();

        return { tasks, total };
    }

    async findOne(id: string): Promise<Task> {
        const task = await this.tasksRepository.findOne({ where: { id } });
        if (!task) {
            throw new NotFoundException(`Task with ID ${id} not found`);
        }
        return task;
    }

    create(createTaskDto: CreateTaskDto): Promise<Task> {
        const task = this.tasksRepository.create(createTaskDto);
        return this.tasksRepository.save(task);
    }

    async update(id: string, updateTaskDto: UpdateTaskDto): Promise<Task> {
        const task = await this.tasksRepository.preload({
            id: id,
            ...updateTaskDto,
        });
        if (!task) {
            throw new NotFoundException(`Task with ID ${id} not found`);
        }
        return this.tasksRepository.save(task);
    }

    async remove(id: string): Promise<void> {
        const result = await this.tasksRepository.delete(id);
        if (result.affected === 0) {
            throw new NotFoundException(`Task with ID ${id} not found`);
        }
    }
}
