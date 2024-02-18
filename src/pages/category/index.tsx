import { useState, FormEvent } from 'react';
import Head from "next/head";
import {Header} from '../../components/Header';
import styles from './styles.module.scss';

import { toast } from 'react-toastify';

import { setupAPIClient } from '../../services/api';
import { canSSRAuth } from '../../utils/canSSRAuth';

export default function Category(){
  const [name, setName] = useState('')

  async function handleRegister(event: FormEvent){
    event.preventDefault(); //não atualiza a página

    try{
      if(name === ''){
        toast.error('Informar o nome da categoria!')
        return;
      }
  
      const apiClient = setupAPIClient();

      await apiClient.post('/category', {
        name: name
      })
  
      toast.success('Categoria cadastrada com sucesso!')
      setName('');

    }catch(err){
      toast.error("Erro ao cadastrar - verificar se a categoria já está cadastrada - " + name);
      console.log("erro ao cadastrar ", err);
    }
  }

  return(
    <>
    <Head>
      <title>Nova categoria</title>
    </Head>
    <div>
      <Header/>

      <main className={styles.container}>
        <h1>Cadastrar categorias</h1>

        <form className={styles.form} onSubmit={handleRegister}>
          <input 
          type="text" 
          placeholder="Digite o nome da categoria"
          className={styles.input}
          value={name}
          onChange={ (e) => setName(e.target.value) }
          />

          <button className={styles.buttonAdd} type="submit">
            Cadastrar
          </button>

        </form>

      </main>
    </div>
    </>
  )
}

//Somente usuários logados podem acessar esta página
export const getServerSideProps = canSSRAuth(async (ctx) => {

  return {
    props: {}
  }

})