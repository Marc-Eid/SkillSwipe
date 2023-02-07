import { Injectable } from '@nestjs/common';
import { User } from 'src/models/user.entity';



@Injectable()
export class FileService {
  

  public async uploadProfilePicture(user: User,fileName: string): Promise<string> {
    user.profile_pic = fileName;
    return (await user.save()).profile_pic;
  }




  
}
