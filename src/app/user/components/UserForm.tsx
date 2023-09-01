import NextLink from "next/link";
import { User } from "@/types/user";
import { Avatar } from "@/components/Avatar";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Label } from "@/components/Label";

const createUserValidationSchema = z.object({
  name: z.string().nonempty("Required field"),
  image: z.string({ required_error: "Required field" }),
  role: z.enum(["uidesigner", "developer", "hrmanager", "leader"], {
    errorMap: () => ({
      message: "Please select one of the options",
    }),
  }),
  status: z.enum(["banned", "active", "idle"], {
    errorMap: () => ({
      message: "Please select one of the options",
    }),
  }),
  company: z.enum(["hemakes", "wemake", "youmake"], {
    errorMap: () => ({
      message: "Please select one of the options",
    }),
  }),
  verified: z.boolean(),
});

type CreateUserValidationSchema = z.infer<typeof createUserValidationSchema>;

interface UserFormProps {
  defaultValues?: CreateUserValidationSchema;
  onSubmit: (data: CreateUserValidationSchema) => void;
}

export function UserForm({ defaultValues, onSubmit }: UserFormProps) {
  const {
    watch,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateUserValidationSchema>({
    resolver: zodResolver(createUserValidationSchema),
    defaultValues,
  });

  return (
    <form className="flex flex-col gap-6" onSubmit={handleSubmit(onSubmit)}>
      <div className="flex max-md:flex-col-reverse max-md:items-center gap-4">
        <div className="flex flex-col gap-2">
          <Label errorMessage={errors.name?.message}>
            Name
            <input
              id="name"
              className="input input-bordered"
              type="text"
              placeholder={defaultValues?.name || "name"}
              {...register("name")}
            />
          </Label>
          <Label errorMessage={errors.image?.message}>
            Image
            <input
              id="user-image"
              className="input input-bordered"
              type="text"
              placeholder={defaultValues?.name || "insert a link to an image"}
              {...register("image")}
            />
          </Label>
          <Label errorMessage={errors.role?.message}>
            Role
            <select id="role" defaultValue="default" className="select select-bordered" {...register("role")}>
              <option value="default" disabled>
                Choose a role
              </option>
              <option value="uidesigner">UI Designer</option>
              <option value="hrmanager">Hr Manager</option>
              <option value="leader">Leader</option>
              <option value="developer">Developer</option>
            </select>
          </Label>
          <Label errorMessage={errors.status?.message}>
            Status
            <select
              id="status"
              className="select select-bordered"
              defaultValue="default"
              {...register("status")}
            >
              <option value="default" disabled>
                Choose a status
              </option>
              <option value="banned">Banned</option>
              <option value="active">Active</option>
              <option value="idle">Idle</option>
            </select>
          </Label>
          <Label>
            Verified
            <input id="verified" type="checkbox" className="toggle" {...register("verified")} />
          </Label>
          <Label errorMessage={errors.company?.message}>
            Company
            <select
              id="comp"
              defaultValue="default"
              className="select select-bordered"
              {...register("company")}
            >
              <option value="default" disabled>
                Choose a company
              </option>
              <option value="hemakes">Hemakes</option>
              <option value="wemake">Wemake</option>
              <option value="youmake">Youmake</option>
            </select>
          </Label>
        </div>
        <Avatar size="xl" image={watch("image")} alt="Image preview" />
      </div>
      <div className="flex justify-center gap-10 mt-10">
        <NextLink href="/user/list">
          <button className="btn btn-error">Cancel</button>
        </NextLink>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </div>
    </form>
  );
}
