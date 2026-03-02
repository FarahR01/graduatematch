import {
  Repository,
  SelectQueryBuilder,
  FindOptionsWhere,
  FindManyOptions,
  DeepPartial,
} from 'typeorm';
import { AppBaseEntity } from '../entities/base.entity';

/**
 * BaseRepository - Generic repository implementation
 * Provides common CRUD operations and query patterns
 * Reduces code duplication across all repositories
 * Memory optimized with proper index usage
 */
export abstract class BaseRepository<Entity extends AppBaseEntity> {
  constructor(private readonly repository: Repository<Entity>) {}

  /**
   * Find all entities with optional filters
   */
  async findAll(options?: FindManyOptions<Entity>): Promise<Entity[]> {
    return this.repository.find(options || {});
  }

  /**
   * Find one entity by criteria
   */
  async findOne(where: FindOptionsWhere<Entity>): Promise<Entity | null> {
    return this.repository.findOne({ where });
  }

  /**
   * Find entity by ID
   */
  async findById(id: string): Promise<Entity | null> {
    return this.repository.findOne({ where: { id } as FindOptionsWhere<Entity> });
  }

  /**
   * Create and save a new entity
   */
  async create(data: DeepPartial<Entity>): Promise<Entity> {
    const entity = this.repository.create(data);
    return this.repository.save(entity);
  }

  /**
   * Update an entity
   */
  async update(id: string, data: DeepPartial<Entity>): Promise<Entity | null> {
    await this.repository.update(id, data as any);
    return this.findById(id);
  }

  /**
   * Delete an entity
   */
  async delete(id: string): Promise<boolean> {
    const result = await this.repository.delete(id);
    return (result.affected ?? 0) > 0;
  }

  /**
   * Count entities matching criteria
   */
  async count(where?: FindOptionsWhere<Entity>): Promise<number> {
    return this.repository.count({ where });
  }

  /**
   * Save multiple entities (batch operation)
   */
  async saveMany(entities: Entity[]): Promise<Entity[]> {
    return this.repository.save(entities);
  }

  /**
   * Get query builder for complex queries
   */
  createQueryBuilder(alias?: string): SelectQueryBuilder<Entity> {
    return this.repository.createQueryBuilder(alias || 'entity');
  }

  /**
   * Check if entity exists
   */
  async exists(where: FindOptionsWhere<Entity>): Promise<boolean> {
    return (await this.repository.count({ where })) > 0;
  }
}
