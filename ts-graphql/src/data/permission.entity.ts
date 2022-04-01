import {Field, ID, ObjectType} from "type-graphql";

@ObjectType()
export class Permission {

  @Field(() => ID) id: number;
  @Field() action: string;

  static new(id: number, name: string): Permission {
    let obj = new Permission();
    obj.id = id;
    obj.action = name;
    return obj;
  }
}
