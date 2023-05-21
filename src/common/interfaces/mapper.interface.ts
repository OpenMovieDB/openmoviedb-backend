export interface IMapper<Entity, Model> {
  mapEntityToModel(entity: Entity): Model;
  mapEntitiesToModels(entities: Entity[]): Model[];
}
