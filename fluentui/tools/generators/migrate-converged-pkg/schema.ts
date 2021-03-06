export interface MigrateConvergedPkgGeneratorSchema {
  /**
   * Library name
   */
  name?: string;
  /**
   * Get statistics for how many projects have been migrated
   */
  stats?: boolean;
  /**
   * Run generator on all vNext packages
   */
  all?: boolean;
}
