import { Formik, Form } from "formik";
import Button from "../commons/Button.component";
import Input from "../commons/Input.component";
import FormAlbumItem from "./FormAlbumItem.component";

const GeneratorForm = ({
  albums,
  onSubmit,
}: {
  albums: Album[];
  onSubmit: (data: {
    name: string;
    password: string;
    albumsIds: string[];
  }) => Promise<void> | void;
}) => (
  <div>
    <Formik
      initialValues={{ name: "", password: "", albumsIds: [] }}
      validate={(values) => {
        const errors: any = {};
        if (!values.name) {
          errors.name = "Nazwa wymagana";
        }
        if (!values.password) {
          errors.password = "Hasło wymagane";
        }
        if (values.albumsIds.length !== 5) {
          errors.albumsIds = "Wybierz 5 albumów";
        }
        return errors;
      }}
      onSubmit={async (values, { setSubmitting }) => {
        await onSubmit(values);

        setSubmitting(false);
      }}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
        isSubmitting,
      }) => (
        <Form onSubmit={handleSubmit}>
          <h1 className="uppercase text-38 font-primary font-black mt-50 mb-36">
            UTWÓRZ NOWĄ playlistE
          </h1>
          <div className="flex flex-row">
            <div style={{ width: "25%" }} className="flex flex-col">
              <Input
                name="name"
                placeholder="Nazwa playlisty"
                className="mr-18"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.name}
              />
              {!!(errors.name && touched.name) && (
                <span className="text-12 font-primary">{errors.name}</span>
              )}
            </div>
            <div style={{ width: "25%" }} className="flex flex-col">
              <Input
                type="password"
                name="password"
                className="ml-6 mr-12"
                placeholder="Hasło"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.password}
              />
              {!!(errors.password && touched.password) && (
                <span className="text-12 font-primary">{errors.password}</span>
              )}
            </div>
          </div>
          <div id="checkbox-group">
            <h1 className="text-24 font-primary mb-12 font-black uppercase mt-36">
              Albumy
            </h1>
          </div>
          <div role="group" aria-labelledby="checkbox-group">
            <div className="flex flex-row flex-wrap grid-quadruple-col">
              {albums.slice(0, 16).map((album, index) => (
                <FormAlbumItem
                  key={index}
                  album={album}
                  handleChange={handleChange}
                />
              ))}
            </div>
            {errors.albumsIds && touched.albumsIds && errors.albumsIds}
          </div>
          <div className="flex flex-row justify-end mt-12 mb-80">
            <div style={{ width: "25%" }}>
              <Button
                type="submit"
                className="w-full pl-18"
                disabled={isSubmitting}
                caption="utwórz"
              />
            </div>
          </div>
        </Form>
      )}
    </Formik>
  </div>
);

export default GeneratorForm;
