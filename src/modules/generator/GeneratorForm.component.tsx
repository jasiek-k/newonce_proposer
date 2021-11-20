import { Formik } from 'formik';

const GeneratorForm = ({ albums, onSubmit }:{ albums: Album[], onSubmit: (data: {
  name: string;
  password: string;
  albumsIds: string[];
}) => Promise<void> | void }) => (
  <div>
    <Formik
      initialValues={{ name: '', password: '', albumsIds: [] }}
      validate={values => {
        const errors: any = {};
        if (!values.name) {
          errors.name = 'Nazwa wymagana';
        }
        if(!values.password) {
          errors.password = 'Hasło wymagane'
        }
        // if(values.albumsIds.length !== 5) {
        //   errors.albumsIds = 'Wybierz 5 albumów'
        // }
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
        <form onSubmit={handleSubmit}>
          <label htmlFor="name">Nazwa</label>
          <input
            name="name"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.name}
          />
          {errors.name && touched.name && errors.name}
          <label htmlFor="password">Hasło</label>
          <input
            type="password"
            name="password"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.password}
          />
          {errors.password && touched.password && errors.password}
          <div id="checkbox-group">Albumy</div>
          <div role="group" aria-labelledby="checkbox-group">
          {albums.map((album) => (
            <div className="flex flex-row">
              <label className="flex flex-row">
                <img className="object-contain h-48" src={album.image.url} alt={`Album ${album.name} cover`} />
                {album.name}
              </label>
              <input onChange={handleChange} type="checkbox" name={"albumsIds"} value={album.slug} />
            </div>
          ))}
          {errors.albumsIds && touched.albumsIds && errors.albumsIds}
          </div>
          <button type="submit" disabled={isSubmitting}>
            Submit
          </button>
        </form>
      )}
    </Formik>
  </div>
);

export default GeneratorForm;