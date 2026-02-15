AI logic lives in /ai and is only executed via background jobs. Controllers and services never call AI directly.

// TODO: AI intent scores are read-only inputs here. 
// Monitoring never triggers AI analysis.