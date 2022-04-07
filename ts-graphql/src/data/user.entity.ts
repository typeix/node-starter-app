import {Field, ID, ObjectType} from "type-graphql";
import {Permission} from "~/data/permission.entity";

@ObjectType()
export class User {

  @Field(() => ID) id: number;

  @Field() firstName: string;

  @Field() lastName: string;

  @Field() age: number;

  @Field(() => [Permission]) permissions: Array<Permission> = [];

  static new(id: number, firstName: string, lastName: string, age: number): User {
    let obj = new User();
    obj.id = id;
    obj.firstName = firstName;
    obj.lastName = lastName;
    obj.age = age;
    return obj;
  }
}
