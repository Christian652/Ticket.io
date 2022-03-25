import { PixKeyTypes } from "src/company/enums/pixKeyTypes.enum"
import { Event } from "src/event/event.entity"
import { User } from "src/user/user.entity"

export class PayBackDto {
  user: User
  pixKey: string
  pixKeyType: PixKeyTypes
  event: Event
}