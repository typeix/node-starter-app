import {Controller, GET, IResolvedRoute, POST, ResolvedRoute} from "@typeix/resty";
import {Render} from "../../../components/interceptors/method/render";
import {addRequestInterceptor} from "@typeix/resty/build/interceptors/request";
import {FileUpload} from "./interceptors/file-upload";

@Controller({
  path: "/"
})
export class FileUploadController {

  @GET("/upload")
  @POST("/upload")
  @Render("file_upload")
  @addRequestInterceptor(FileUpload, {uploadPath: "/public/upload/"})
  actionUploadFile(@ResolvedRoute() route: IResolvedRoute) {
    return {
      title: "File Upload example",
      message: "Magic is here",
      isUploaded: route.url.searchParams.get("isUploaded")
    }
  }

}
