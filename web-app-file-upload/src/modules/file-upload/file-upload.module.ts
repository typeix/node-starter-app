import {Module} from "@typeix/resty";
import {FileUploadController} from "./controllers/file-upload.controller";


@Module({
  path: "/file",
  providers: [],
  controllers: [FileUploadController]
})
export class FileUploadModule {

}
