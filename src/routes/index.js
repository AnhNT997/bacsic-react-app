import Todo from '~/pages/todo';
const publicRoutes = [
  // {path:'/',component:Home}
  { path: '/todo', component: Todo, tag: 'Todo app' },
];
const privateRoutes = [];

export { privateRoutes, publicRoutes };
