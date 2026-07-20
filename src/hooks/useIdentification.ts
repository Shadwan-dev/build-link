import { formatearIdentificacion, validarIdentificacion } from '@/lib/utils/validacion';
import { useCallback, useEffect, useState } from 'react';

export const useIdentificacion = (paisInicial: 'CL' | 'CU' = 'CL') => {
  const [valor, setValor] = useState('');
  const [pais, setPais] = useState<'CL' | 'CU'>(paisInicial);
  const [esValido, setEsValido] = useState<boolean | null>(null);
  const [mensaje, setMensaje] = useState('');

  // ✅ Validación automática
  useEffect(() => {
    if (valor.length >= 2) {
      const resultado = validarIdentificacion(valor, pais);
      setEsValido(resultado.esValido);
      setMensaje(resultado.mensaje);
    } else {
      setEsValido(null);
      setMensaje('');
    }
  }, [valor, pais]);

  const cambiarValor = useCallback(
    (nuevoValor: string) => {
      // ✅ Formatear automáticamente
      if (nuevoValor.length > 2 && (pais === 'CL' || pais === 'CU')) {
        const formateado = formatearIdentificacion(nuevoValor, pais);
        setValor(formateado);
      } else {
        setValor(nuevoValor);
      }
    },
    [pais]
  );

  const cambiarPais = useCallback((nuevoPais: 'CL' | 'CU') => {
    setPais(nuevoPais);
    setValor('');
    setEsValido(null);
    setMensaje('');
  }, []);

  const validar = useCallback((): boolean => {
    const resultado = validarIdentificacion(valor, pais);
    setEsValido(resultado.esValido);
    setMensaje(resultado.mensaje);
    return resultado.esValido;
  }, [valor, pais]);

  return {
    valor,
    pais,
    esValido,
    mensaje,
    cambiarValor,
    cambiarPais,
    validar,
    formatear: () => formatearIdentificacion(valor, pais),
  };
};
