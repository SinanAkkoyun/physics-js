import { distance, Unit } from "mathjs";
import { centrifugal_force } from "../formulas";
import { Cube, Shape, ShapeObject } from "../types/shapes";
import { add, distance_to_origin, u } from "../util";

export const integrate_over_shapes = (...objects: ShapeObject[]) => {
  let integral = u('0 m')
  for(const obj of objects) {
    if(obj.shape instanceof Cube) {
      const shape = obj.shape as Cube
      const subdivide = 5000
      const massSub = obj.m.divide(u(subdivide*objects.length))

      // for(let ix=0; ix<1; ix+=1/subdivide) {
        for(let iy=0; iy<1; iy+=1/subdivide) {
          // const dist = distance_to_origin(add(shape.a.multiply(u(ix)), shape.pos.x), add(shape.b.multiply(u(iy)), shape.pos.y))
          const dist = add(shape.b.multiply(u(iy)), shape.pos.y)

          // integral = add(integral, centrifugal_force(massSub, '1 s^-1', dist))
          integral = add(integral, dist.divide(u(subdivide*objects.length)))
        }
      // }
    }
  }
  return integral
}
