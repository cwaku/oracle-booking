/* eslint-disable react/jsx-props-no-spreading */
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import FormError from '../components/Form/FormError';
import PrimaryButton from '../components/Form/PrimaryButton';
import { useAddNewCarMutation } from '../features/cars/carsSlice';

const AddCars = () => {
  const [addNewCar, { isLoading, isError, error }] = useAddNewCarMutation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [formSuccess, setFormSuccess] = useState(false);

  const onSubmit = async (data) => {
    const {
      title, description, price, image, model,
    } = data;
    const newCar = new FormData();
    newCar.append('title', title);
    newCar.append('description', description);
    newCar.append('price', Number(price));
    newCar.append('image', image[0]);
    newCar.append('model', model);
    try {
      await addNewCar(newCar).unwrap();
      setFormSuccess(true);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log('Failed to add car', error);
    }
  };

  return (
    <section className="fixed top-0 w-full h-full md:pr-[9vw] bg-[url('/src/images/car-medium.png')] md:bg-[url('/src/images/2-2-car-transparent.png')] bg-center bg-no-repeat bg-200%">
      <div className="w-full h-full md:pr-[12vw] bg-[#efefef]/90 px-50 flex flex-col justify-center">
        <div className="h-full text-center flex flex-col items-center pt-10 w-5/5">
          <h1 className="font-bold text-gray-700 text-2xl md:text-5xl text-center uppercase mb-0">
            Add Cars
          </h1>
          {isError && (
            <p>
              Error:
              {' '}
              {error.data.message}
              <br />
              {error.data.errors.map((error) => (
                <span key={error.index}>
                  {error}
                  <br />
                </span>
              ))}
            </p>
          )}
          <p
            className={`text-green-600 text-center my-2 opacity-0 transition-opacity ${
              formSuccess && 'opacity-100'
            }`}
          >
            Added successfully
          </p>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col items-start justify-center w-4/5 max-w-xl mx-auto gap-3 mb-10 md:mb-20 sm-w-full"
          >
            {errors.make && <FormError>Must fill out this field</FormError>}
            <input
              type="text"
              className="border-2 border-gray-500 rounded-3xl w-full p-2 hover:border-orange-600 transition-colors active:border-orange-700 focus:outline-none focus:border-orange-700"
              placeholder="Car model"
              {...register('model', { required: true, maxLength: 50 })}
            />
            {errors.model && <FormError>Must fill out this field</FormError>}
            <input
              type="text"
              className="border-2 border-gray-500 rounded-3xl w-full p-2 hover:border-orange-600 transition-colors active:border-orange-700 focus:outline-none focus:border-orange-700"
              placeholder="Car title"
              {...register('title', { required: true, maxLength: 50 })}
            />
            {errors.year && <FormError>{errors.year?.type}</FormError>}
            <input
              type="number"
              className="border-2 border-gray-500 rounded-3xl w-full p-2 hover:border-orange-600 transition-colors active:border-orange-700 focus:outline-none focus:border-orange-700"
              placeholder="Car price"
              {...register('price', { required: true, min: 1 })}
            />
            {errors.price && <FormError>{errors.price?.type}</FormError>}
            <input
              type="file"
              accept="image/*"
              className="border-2 border-gray-500 rounded w-full p-1 hover:border-orange-600 transition-colors active:border-orange-700 focus:outline-none focus:border-orange-700"
              placeholder="Car image link"
              {...register('image', { required: true })}
            />
            {errors.image && <FormError>This field is required</FormError>}
            <textarea
              placeholder="Bike description"
              className="border-2 border-gray-500 rounded w-full p-1  active:border-orange-700 focus:outline-none focus:border-orange-700"
              {...register('description', { required: true })}
              rows="8"
            />
            {errors.description && <FormError>Must fill out this field</FormError>}
            <PrimaryButton btnType="submit">
              {isLoading ? 'Loading...' : 'Add Car'}
            </PrimaryButton>
          </form>
        </div>
      </div>
    </section>
  );
};
export default AddCars;
