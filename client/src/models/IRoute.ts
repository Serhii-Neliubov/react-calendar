
export interface IRoute {
  path: string,
  name: string,
  component: () => JSX.Element,
}