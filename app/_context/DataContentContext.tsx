import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from 'react';
import { Hero, Section } from '../types';
import GlobalApi from '../_utils/GlobalApi';

type DatasContentType = {
  hero?: Hero;
  section?: Section;
  loading: boolean;
};

// Contexte vide initialisé
const DatasContentContext = createContext<DatasContentType | undefined>(
  undefined
);

export const useDatasContentContext = () => {
  const context = useContext(DatasContentContext);
  if (!context) {
    throw new Error(
      'useDatasContentContext must be used within an AuthProvider'
    );
  }
  return context;
};

// Fournisseur du contexte
export const DatasContentProvider = ({ children }: { children: ReactNode }) => {
  const [hero, setHero] = useState<Hero | undefined>();
  const [section, setSection] = useState<Section | undefined>();
  const [loading, setLoading] = useState(true);

  const getHeroDatasContent = () => {
    setLoading(true);
    GlobalApi.getHomePageHeroDatas().then(
      (resp) => {
        setHero(resp);
        localStorage.setItem('hero', JSON.stringify(resp));
      },
      () => {
        setLoading(false);
      }
    );
  };
  const getSectionsDatasContent = () => {
    setLoading(true);
    GlobalApi.getHomePageSectionsDatas()
      .then(
        (resp) => {
          setSection(resp);
          localStorage.setItem('sections', JSON.stringify(resp));
        },
        () => {
          setLoading(false);
        }
      )
      .finally(() => setLoading(false));
  };

  const checkHeroDatas = async () => {
    setLoading(true);
    const hero = localStorage.getItem('hero');
    if (hero) {
      const data = JSON.parse(hero);
      const heroData: Hero = {
        title: data.title,
        description: data.description,
        image: { url: data.image.url },
        button: { title: data.button.title, link: data.button.link },
        id: data.documentId,
      };
      setHero(heroData);
    } else {
      getHeroDatasContent();
    }
    setLoading(false);
  };
  const checkSectionsDatas = async () => {
    const sections = localStorage.getItem('sections');

    if (sections) {
      const data = JSON.parse(sections);
      const sectionsData: Section = {
        title: data.title,
        description: data.description,
        image: data.image,
        button: { title: data.button.title, link: data.button.link },
        id: data.id,
      };
      setSection(sectionsData);
      setLoading(false);
    } else {
      getSectionsDatasContent();
    }
    setLoading(false);
  };

  useEffect(() => {
    checkHeroDatas();
    getHeroDatasContent();
    checkSectionsDatas();
  }, []);

  return (
    <DatasContentContext.Provider value={{ hero, loading, section }}>
      {children}
    </DatasContentContext.Provider>
  );
};
