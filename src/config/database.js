module.exports = {
  dialect: 'postgres',
  host: '127.0.0.1',
  username: 'docker',
  password: 'docker',
  database: 'gonodemodulo2',
  operatorAliases: false,
  define: {
    timestamps: true, //  Automatically adds created_at and updated_at for every table
    underscored: true, // snake case for fields
    underscoredAll: true // snake case for table names
  }
}
