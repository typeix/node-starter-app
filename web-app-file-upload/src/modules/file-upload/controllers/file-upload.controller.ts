import {addRequestInterceptor, Controller, GET, IResolvedRoute, POST, ResolvedRoute} from "@typeix/resty";
import {Render} from "@app/components/interceptors/method/render.interceptor";
import {FileUploadInterceptor} from "./interceptors/file-upload.interceptor";

@Controller({
  path: "/"
})
export class FileUploadController {

  @GET("/upload")
  @POST("/upload")
  @Render("file_upload")
  @addRequestInterceptor(FileUploadInterceptor, {uploadPath: "/public/upload/"})
  actionUploadFile(@ResolvedRoute() route: IResolvedRoute) {
    return {
      title: "File Upload example",
      message: "Magic is here",
      isUploaded: route.url.searchParams.get("isUploaded")
    };
  }

}
