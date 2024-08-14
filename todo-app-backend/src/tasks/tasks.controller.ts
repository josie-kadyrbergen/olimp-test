import { Controller, Get, Post, Body, Param, Delete, Put, UseGuards, Query } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from './tasks.entity';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('tasks')
export class TasksController {
    constructor(private readonly tasksService: TasksService) {}

    @Get()
    async findAll(
        @Query('status') status: string,
        @Query('page') page: number = 1,
        @Query('limit') limit: number = 5,
        @Query('sort') sort: string = 'title'
    ): Promise<{ tasks: Task[], total: number }> {
        return await this.tasksService.findAll({ status, page, limit, sort });
    }

    @Get(':id')
    findOne(@Param('id') id: string): Promise<Task> {
        return this.tasksService.findOne(id);
    }

    @Post()
    create(@Body() createTaskDto: CreateTaskDto): Promise<Task> {
        return this.tasksService.create(createTaskDto);
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto): Promise<Task> {
        return this.tasksService.update(id, updateTaskDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string): Promise<void> {
        return this.tasksService.remove(id);
    }
}
