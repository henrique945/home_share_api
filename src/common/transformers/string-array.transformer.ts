import { serialize } from 'class-transformer';
import { ValueTransformer } from 'typeorm';

export const StringArrayTransformer: ValueTransformer = {
  from(value: string): string[] {
    const objects = JSON.parse(value) as string[];

    if (!Array.isArray(objects))
      return [];

    return objects;
  },
  to(value: string[]): string {
    return serialize(value);
  },
};
