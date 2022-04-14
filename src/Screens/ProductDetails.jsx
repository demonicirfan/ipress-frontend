import {
  Button,
  Select,
  FormControl,
  Container,
  Heading,
  HStack,
  Image,
  Tag,
  Text,
  VStack,
  Center,
  Stack,
  Input,
  FormErrorMessage,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Rating from '../Components/Product/Rating';
import { useDispatch, useSelector } from 'react-redux';
import { listProductDetails } from '../Actions/productAction';
import { useNavigate, generatePath } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import Faq from '../Components/Sections/FAQ';

const isAdmin = true;
const useNavigateParams = () => {
  const navigate = useNavigate();

  return (url, params) => {
    const path = generatePath(':url?:queryString', {
      url,
      queryString: params,
    });
    navigate(path);
  };
};

const product = {
  image:
    'https://i.pinimg.com/736x/0e/fe/72/0efe728db4b33f979300967d7723c756.jpg',
  name: 'Flyers',
  details:
    'Give your customers flyers with all the details they need to know about your business. Explore fully customisable templates, or upload your own design',
  fields: [
    { name: 'productOrientation', placeholder: 'Product Orientation' },
    { name: 'size', placeholder: 'Size' },
    { name: 'paperThickness', placeholder: 'Paper thickness' },
    { name: 'quantity', placeholder: 'Quantity' },
  ],
  browseDesign: true,
  uploadDesign: true,
};
const data = [
  {
    question:
      'Praesentium ipsa ipsam non aut repellat dolorem itaque illo nisi odio cum!',
    answer:
      '. Adipisci dolores soluta ad, harum consequuntur itaque ducimus architecto nemo illum! Natus magnam dolores consequuntur perferendis. Unde eligendi est atque! Error, ad? Tenetur similique quisquam amet officiis hic officia molestiae quos.',
  },
  {
    question:
      'Rem sed illo quos perferendis itaque provident exercitationem reiciendis, corrupti enim.',
    answer: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
  },
  {
    question: 'Cumque ea itaque voluptates incidunt.',
    answer:
      'Praesentium ipsa ipsam non aut repellat dolorem itaque illo nisi odio cum!',
  },
  {
    question:
      'Autem in commodi adipisci earum impedit rem laboriosam eligendi accusantium ex modi possimus',
    answer:
      '. Adipisci dolores soluta ad, harum consequuntur itaque ducimus architecto nemo illum! Natus magnam dolores consequuntur perferendis. Unde eligendi est atque! Error, ad? Tenetur similique quisquam amet officiis hic officia molestiae quos.',
  },
  {
    question: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
    answer:
      'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Labore cumque totam, culpa nemo quibusdam voluptatem sequi architecto nobis beatae quaerat saepe nesciunt quis numquam similique! Rem, hic. Non, veritatis eius perferendis voluptates porro cum possimus similique aliquid dolores labore dolorum quam vel rem quas, necessitatibus expedita et ut est, blanditiis eaque natus odio atque nostrum commodi expedita minima sint velit! Nihil, placeat quibusdam voluptatum quisquam officiis aut, praesentium debitis quae fugiat obcaecati modi rerum adipisci fuga ea vel minima doloremque quas',
  },
  {
    question: 'Provident exercitationem reiciendis, corrupti enim.',
    answer:
      'Praesentium ipsa ipsam non aut repellat dolorem itaque illo nisi odio cum!',
  },
];
const ProductDetails = () => {
  const [qty, setQty] = useState(0);
  const navigate = useNavigateParams();

  const { id } = useParams();

  const dispatch = useDispatch();
  //const { loading, product, error } = useSelector(state => state.productDetail);

  const {
    handleSubmit,
    register,
    setError,
    formState: { errors, isSubmitting },
  } = useForm();

  useEffect(() => {
    dispatch(listProductDetails(id));
  }, [dispatch, id]);

  const addToCartHandler = () => {
    navigate(`/cart/${id}`, `qty=${qty}`);
  };

  const onSubmit = data => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack
        spacing={{ base: '4rem', lg: '2rem' }}
        p={{ base: '4rem 1.5rem', md: '6rem 2rem' }}
        maxW="6xl"
        mx="auto"
        direction={{ base: 'column-reverse', lg: 'row' }}
        alignItems={{ base: 'center', lg: 'flex-start' }}
        justifyContent={'space-between'}
      >
        <VStack alignItems={'start'} maxW={{ base: '70vw', md: '35rem' }}>
          <Heading fontWeight={'400'}>{product.name}</Heading>
          <Text>{product.details}</Text>
          <VStack w="full" p={{ base: '1rem', md: '2rem' }}>
            {product.fields.map((field, index) => (
              <FormControl w="full" isRequired mb="1rem">
                <Input
                  fontSize="xl"
                  variant="custom"
                  borderBottom={'1px solid gray'}
                  type={'text'}
                  px="0.5rem"
                  h={{ base: '3rem', md: '3.6rem' }}
                  size={{ base: 'sm', md: 'lg' }}
                  placeholder={field.placeholder}
                  {...register(`${field.name}`, {
                    required: 'Please enter Password',
                    minLength: { value: 4, message: 'Too Short' },
                  })}
                />
                {errors.name && (
                  <FormErrorMessage>{errors.name.message}</FormErrorMessage>
                )}
              </FormControl>
            ))}
          </VStack>
          <Stack
            direction={{ base: 'column', md: 'row' }}
            justify={'space-around'}
            w="full"
          >
            {product.browseDesign && (
              <Button type="submit" variant={'custom-black'}>
                Browse Design
              </Button>
            )}
            {product.uploadDesign && (
              <Button variant={'custom-black'} color="red" borderColor={'red'}>
                Upload Design
              </Button>
            )}
          </Stack>
        </VStack>
        <Center mx="auto">
          <Image src={product.image} w={{ base: '18rem', md: '25rem' }} />
        </Center>
      </Stack>
      <Faq data={data} />
    </form>
  );
};

export { ProductDetails };