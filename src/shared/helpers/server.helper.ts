export const art = (port) => `\x1b[36m Starting on port ${port}

phpMyAdmin: http://localhost:8080/ 
`;

export const isDebug = () => process.env.npm_lifecycle_event === 'start:debug';
