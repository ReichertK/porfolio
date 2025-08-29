import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Container } from '../components/Layout/Container';
import { SectionTitle } from '../components/SectionTitle';
import { ProjectCard } from '../components/ProjectCard';
import { Filters } from '../components/Filters';
import { useGithubData } from '../hooks/useGithubData';
import { debounce } from '../utils/format';
import { SEO } from '../seo';

export function Projects() {
  const { repos, languages, loading, error } = useGithubData();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('');

  // Debounced search to avoid excessive filtering
  const debouncedSetSearchTerm = useMemo(
    () => debounce((term: string) => setSearchTerm(term), 300),
    []
  );

  // Filter repositories based on search and language
  const filteredRepos = useMemo(() => {
    return repos.filter(repo => {
      const matchesSearch = !searchTerm || 
        repo.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (repo.description && repo.description.toLowerCase().includes(searchTerm.toLowerCase())) ||
        repo.topics.some(topic => topic.toLowerCase().includes(searchTerm.toLowerCase()));

      const matchesLanguage = !selectedLanguage || repo.language === selectedLanguage;

      return matchesSearch && matchesLanguage;
    });
  }, [repos, searchTerm, selectedLanguage]);

  const handleSearchChange = (value: string) => {
    debouncedSetSearchTerm(value);
  };

  const handleLanguageChange = (value: string) => {
    setSelectedLanguage(value);
  };

  const handleClearFilters = () => {
    setSearchTerm('');
    setSelectedLanguage('');
    // Clear the debounced search as well
    debouncedSetSearchTerm('');
  };

  if (loading) {
    return (
      <>
        <SEO title="Proyectos" />
        <Container className="py-20">
          <SectionTitle 
            title="Proyectos" 
            subtitle="Cargando repositorios desde GitHub..."
            centered 
          />
          <div className="flex justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent"></div>
          </div>
        </Container>
      </>
    );
  }

  if (error) {
    return (
      <>
        <SEO title="Proyectos" />
        <Container className="py-20">
          <SectionTitle 
            title="Proyectos" 
            subtitle="Error al cargar los proyectos"
            centered 
          />
          <div className="card p-8 text-center">
            <p className="text-red-400 mb-4">⚠️ {error}</p>
            <p className="text-gray-400">
              Por favor, verifica que la variable de entorno VITE_GITHUB_USERNAME esté configurada correctamente.
            </p>
          </div>
        </Container>
      </>
    );
  }

  return (
    <>
      <SEO 
        title="Proyectos" 
        description="Explora mis proyectos open source y repositorios públicos de GitHub"
      />
      
      <Container className="py-20">
        <SectionTitle 
          title="Proyectos" 
          subtitle="Explora mis repositorios públicos de GitHub con búsqueda y filtros"
          centered 
        />

        <Filters
          searchTerm={searchTerm}
          selectedLanguage={selectedLanguage}
          languages={languages}
          onSearchChange={handleSearchChange}
          onLanguageChange={handleLanguageChange}
          onClear={handleClearFilters}
        />

        {repos.length === 0 ? (
          <div className="card p-8 text-center">
            <p className="text-gray-400">
              No se encontraron repositorios públicos.
            </p>
          </div>
        ) : filteredRepos.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="card p-8 text-center"
          >
            <p className="text-gray-400 mb-4">
              No se encontraron proyectos que coincidan con los filtros actuales.
            </p>
            <button
              onClick={handleClearFilters}
              className="btn-primary"
            >
              Limpiar filtros
            </button>
          </motion.div>
        ) : (
          <>
            {/* Results count */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mb-6 text-gray-400"
            >
              Mostrando {filteredRepos.length} de {repos.length} proyecto{repos.length !== 1 ? 's' : ''}
            </motion.div>

            {/* Projects Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredRepos.map((repo, index) => (
                <ProjectCard 
                  key={repo.id} 
                  repo={repo} 
                  index={index} 
                />
              ))}
            </div>
          </>
        )}

        {/* GitHub Link */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-16 text-center"
        >
          <p className="text-gray-400 mb-4">
            ¿Quieres ver más? Visita mi perfil completo de GitHub
          </p>
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary"
          >
            Ver en GitHub
          </a>
        </motion.div>
      </Container>
    </>
  );
}