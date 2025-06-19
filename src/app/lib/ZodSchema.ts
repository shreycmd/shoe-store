import {z} from "zod"
export const productSchema=z.object({
    name :z.string() ,
  description: z.string(),
  status:  z.enum(["draft","published","archived"]),
  price :z.number().min(1,"price must be gretaer than 0"),
  images : z.array(z.string()).min(1,"Atlest one image required"),
  category  : z.enum(["kids","men","women"]),
  isFeatured:z.boolean().optional()
})
export const BannerSchema=z.object({
  title:z.string(),
  imageString:z.string()
})