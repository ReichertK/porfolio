import React from 'react';
import { motion } from 'framer-motion';
import { Container } from '../components/Layout/Container';
import { SectionTitle } from '../components/SectionTitle';
import { SkillBadge } from '../components/SkillBadge';
import { useGithubData } from '../hooks/useGithubData';
import { SEO } from '../seo';

export function Skills() {
  const { skills, loading, error } = useGithubData();

  if (loading) {
    return (
      <>
        <SEO title="Habilidades" />
        <Container className="py-20">
          <SectionTitle 
            title="Habilidades" 
            subtitle="Cargando habilidades detectadas desde GitHub..."
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
        <SEO title="Habilidades" />
        <Container className="py-20">
          <SectionTitle 
            title="Habilidades" 
            subtitle="Error al cargar las habilidades"
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

  const groupedSkills = {
    language: skills.filter(skill => skill.category === 'language'),
    framework: skills.filter(skill => skill.category === 'framework'),
    tool: skills.filter(skill => skill.category === 'tool'),
    other: skills.filter(skill => skill.category === 'other')
  };

  const categoryTitles = {
    language: 'Lenguajes de Programación',
    framework: 'Frameworks y Librerías',
    tool: 'Herramientas y Tecnologías',
    other: 'Otras Habilidades'
  };

  return (
    <>
      <SEO 
        title="Habilidades" 
        description="Habilidades técnicas detectadas automáticamente desde mis proyectos de GitHub"
      />
      
      <Container className="py-20">
        <SectionTitle 
          title="Habilidades" 
          subtitle="Tecnologías y herramientas que uso, detectadas automáticamente desde mis repositorios de GitHub"
          centered 
        />

        {skills.length === 0 ? (
          <div className="card p-8 text-center">
            <p className="text-gray-400">
              No se encontraron habilidades en los repositorios públicos.
            </p>
          </div>
        ) : (
          <div className="space-y-12">
            {Object.entries(groupedSkills).map(([category, categorySkills]) => {
              if (categorySkills.length === 0) return null;
              
              return (
                <motion.div
                  key={category}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                >
                  <h3 className="text-2xl font-semibold text-white mb-6">
                    {categoryTitles[category as keyof typeof categoryTitles]}
                  </h3>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {categorySkills.map((skill, index) => (
                      <SkillBadge 
                        key={skill.name} 
                        skill={skill} 
                        index={index} 
                      />
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}

        {/* Skills methodology explanation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-16 card p-6"
        >
          <h3 className="text-lg font-semibold text-white mb-4">
            ¿Cómo se detectan las habilidades?
          </h3>
          <p className="text-gray-400 leading-relaxed">
            Este sistema analiza automáticamente mis repositorios públicos de GitHub para detectar 
            las tecnologías que realmente uso. Se consideran factores como el lenguaje principal, 
            la distribución de código por lenguaje, los topics del repositorio, palabras clave en 
            descripción y nombre, actividad reciente y popularidad. La puntuación refleja qué tan 
            frecuentemente uso cada tecnología en mis proyectos.
          </p>
        </motion.div>
      </Container>
    </>
  );
}