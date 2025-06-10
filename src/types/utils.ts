import { CellType } from './enums/cell-type';
import { ColumnType } from './interfaces/data';

/**
 * Type guard to check if a value is a valid cell type
 */
export function isCellType(value: unknown): value is CellType {
    return Object.values(CellType).includes(value as CellType);
}

/**
 * Type guard to check if a value is a valid column type
 */
export function isColumnType(value: unknown): value is ColumnType {
    return (
        typeof value === 'object' &&
        value !== null &&
        'cellType' in value &&
        'format' in value &&
        isCellType((value as ColumnType).cellType) &&
        typeof (value as ColumnType).format === 'string'
    );
}

/**
 * Type for a function that formats cell data
 */
export type CellFormatter = (value: unknown) => string;

/**
 * Type for a function that validates cell data
 */
export type CellValidator = (value: unknown) => boolean;

/**
 * Type for a function that transforms cell data
 */
export type CellTransformer = (value: unknown) => unknown;
