import dynamoDB from "..";
import { IFriend } from "../../../app/entities/Friend";
import Repository from "./Repository";
const tableName = "Friends";

class FriendRepository extends Repository<IFriend> {
  constructor() {
    super(tableName);
  }
}
export default new FriendRepository();
