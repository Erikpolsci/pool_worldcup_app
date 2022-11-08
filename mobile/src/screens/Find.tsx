import { Heading, VStack, useToast } from "native-base";
import { useState } from "react";


import { Button } from "../components/Button"
import { Header } from "../components/Header"
import { Input } from "../components/Input"
import { useNavigation } from "@react-navigation/native"

import { api } from '../services/api'


export function Find() {
    const [isLoading, setIsLoading] = useState(false);
    const [code, setCode] = useState('')

    const toast = useToast();
    const{ navigate } = useNavigation();


    async function handleJoinPool(){
        try {
            setIsLoading(true)

            if(!code.trim()){
                return toast.show({
                    title: 'Informe o codigo do bolao',
                     placement: 'top',
                    bgColor: 'red.500'
                });
            }

            await api.post('/pools/join', {code})

            toast.show({
                title: 'voce entrou no bolao com sucesso',
                placement: 'top',
                bgColor: 'green.500'
            });

            navigate('pools')




        } catch (error) {
            console.log(error);
            setIsLoading(false);


            if(error.response?.data?.message === 'pool not found.'){
               return toast.show({
                    title: 'Bolao nao encontrado',
                     placement: 'top',
                    bgColor: 'red.500'
                });
            }

            if(error.response?.data?.message === 'pool not found.'){
                return toast.show({
                     title: 'Você já está nesse bolão',
                      placement: 'top',
                     bgColor: 'red.500'
                 });
             }

           
        } 
    }
        
    


    return(
        <VStack flex={1} bgColor="gray.900">
            <Header title="Buscar por codigo" showBackButton />

            <VStack mt={8} mx={5} alignItems="center">
            

            <Heading fontFamily="heading" color="white" fontSize="xl" mb={8} textAlign="center">
             Encontre um bolão através de seu código único
            </Heading>

            <Input
            mb={2}
            placeholder="Qual o código do bolão?"
            autoCapitalize="characters"
            onChangeText={setCode}

            />
        
            <Button
            title="BUSCAR BOLÃO"
            isLoading={isLoading}
            onPress={handleJoinPool}
            />

        

            </VStack>


        </VStack>
    );
}