import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiSend, FiCheck, FiAlertCircle } from 'react-icons/fi';
import { ContactFormData, ContactFormStatus } from '../types';

export function ContactForm() {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    message: ''
  });
  
  const [status, setStatus] = useState<ContactFormStatus>({
    status: 'idle'
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setStatus({
        status: 'error',
        message: 'Por favor completa todos los campos'
      });
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setStatus({
        status: 'error',
        message: 'Por favor ingresa un email válido'
      });
      return;
    }

    try {
      setStatus({ status: 'sending' });
      
      // Simulate async send (replace with actual backend call)
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setStatus({
        status: 'sent',
        message: '¡Mensaje enviado exitosamente! Te responderé pronto.'
      });
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        message: ''
      });

      // Reset status after 5 seconds
      setTimeout(() => {
        setStatus({ status: 'idle' });
      }, 5000);
      
    } catch (error) {
      setStatus({
        status: 'error',
        message: 'Error al enviar el mensaje. Por favor intenta nuevamente.'
      });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="card p-8"
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Name */}
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
            Nombre *
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            disabled={status.status === 'sending'}
            className="input"
            placeholder="Tu nombre completo"
          />
        </div>

        {/* Email */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
            Email *
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            disabled={status.status === 'sending'}
            className="input"
            placeholder="tu.email@ejemplo.com"
          />
        </div>

        {/* Message */}
        <div>
          <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
            Mensaje *
          </label>
          <textarea
            id="message"
            name="message"
            rows={5}
            value={formData.message}
            onChange={handleChange}
            disabled={status.status === 'sending'}
            className="input resize-none"
            placeholder="Cuéntame sobre tu proyecto o idea..."
          />
        </div>

        {/* Status Message */}
        {status.status !== 'idle' && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className={`p-4 rounded-lg flex items-center space-x-3 ${
              status.status === 'sent' 
                ? 'bg-emerald-600/20 text-emerald-300' 
                : status.status === 'error'
                ? 'bg-red-600/20 text-red-300'
                : 'bg-blue-600/20 text-blue-300'
            }`}
          >
            {status.status === 'sent' && <FiCheck size={20} />}
            {status.status === 'error' && <FiAlertCircle size={20} />}
            {status.status === 'sending' && (
              <div className="animate-spin rounded-full h-5 w-5 border-2 border-blue-400 border-t-transparent" />
            )}
            <span>{status.message || 'Enviando mensaje...'}</span>
          </motion.div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={status.status === 'sending'}
          className="btn-primary w-full flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {status.status === 'sending' ? (
            <>
              <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent" />
              <span>Enviando...</span>
            </>
          ) : (
            <>
              <FiSend size={20} />
              <span>Enviar Mensaje</span>
            </>
          )}
        </button>
      </form>
    </motion.div>
  );
}