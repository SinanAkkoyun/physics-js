import { Unit } from "mathjs";

export type Shape = Cube | Circle | HollowCircle

export interface Position {
  x: Unit,
  y: Unit
}

export class Cube { constructor (public a: Unit, public b: Unit, public pos: Position) {} }

export class Circle { constructor (public r: Unit, public pos: Position) {} }

export class HollowCircle { constructor (public r1: Unit, public r2: Unit, public pos: Position) {} }

export class ShapeObject { constructor (public shape: Shape, public m: Unit) {} }
