
import '../sass/main.scss';
import { useMemo, useState } from 'react' 
import { client, setToken } from '../utils/apollo/apollo';
import { ApolloProvider } from '@apollo/client';
import { GET_POSTS } from '../utils/graphql/mutation/post';
import { ChakraProvider,ColorModeScript,ColorModeProvider,CSSReset } from '@chakra-ui/react'; 
// import { MarkdownFieldPlugin } from "react-tinacms-editor";
import { withTina,TinaProvider, TinaCMS, useCMS } from "tinacms";
import { HtmlFieldPlugin, MarkdownFieldPlugin } from "react-tinacms-editor"
import { AuthProvider } from '../utils/context/auth-context';
import ProtectedRoute from '../components/ProtectedRoute';
import { useEffect } from 'react';

import TinaMediaStore from '../utils/tina/store';
import { Userdetails } from '../utils/getUser';

function MyApp({ Component, pageProps }) {

    const cms = useCMS()
    const { slug } = pageProps 
    let currentUser = {}
    useEffect(()=>{
      
      if((slug === 'newPost' || slug === 'editPost')){
        cms.enable()
       }else{
        document.body.style.paddingLeft = '0'
        cms.disable()
       }
       currentUser = Userdetails()
        
    }, [slug])


    return (
            <AuthProvider>
                <ApolloProvider client={client}>
                    <ChakraProvider>
                        <ColorModeScript initialColorMode="light" />
                        <ColorModeProvider options={{
                            useSystsemColorMode: true
                        }}>
                            <CSSReset />
                        </ColorModeProvider>
                        { 
                            pageProps.protected ? <ProtectedRoute currentUser componentProps={pageProps} element={Component}/> : <Component {...pageProps} />
                        }
                    </ChakraProvider>
                </ApolloProvider>
            </AuthProvider>
    )
}

// export default MyApp;

export default withTina(MyApp, {
    media: new TinaMediaStore(),
    plugins: [MarkdownFieldPlugin],
    enabled: true,
    sidebar: true
  })