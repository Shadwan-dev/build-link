import { log } from '@/lib/utils/logger';
// components/auth/TermsAndConditions.tsx
export const TermsAndConditions = () => (
  <div className="space-y-4 text-sm text-gray-600">
    <h3 className="text-lg font-semibold text-gray-900">Términos y Condiciones de Uso</h3>

    <div className="space-y-2">
      <h4 className="font-medium">1. Aceptación de los Términos</h4>
      <p>
        Al registrarte en nuestra plataforma, aceptas cumplir con estos términos y condiciones. Si
        no estás de acuerdo, por favor no uses nuestros servicios.
      </p>
    </div>

    <div className="space-y-2">
      <h4 className="font-medium">2. Descripción del Servicio</h4>
      <p>
        Nuestra plataforma conecta clientes con proveedores de servicios de construcción,
        albañilería y carpintería. Actuamos como intermediarios facilitando la comunicación pero no
        somos responsables de la calidad del trabajo realizado.
      </p>
    </div>

    <div className="space-y-2">
      <h4 className="font-medium">3. Responsabilidades del Usuario</h4>
      <ul className="list-disc pl-5 space-y-1">
        <li>Proporcionar información veraz y actualizada</li>
        <li>No utilizar la plataforma para fines ilegales</li>
        <li>Respetar a otros usuarios y sus datos</li>
        <li>Mantener la confidencialidad de tu cuenta</li>
      </ul>
    </div>

    <div className="space-y-2">
      <h4 className="font-medium">4. Verificación de Proveedores</h4>
      <p>
        Los proveedores deben proporcionar documentación válida. Nos reservamos el derecho de
        verificar la autenticidad de los datos proporcionados.
      </p>
    </div>

    <div className="space-y-2">
      <h4 className="font-medium">5. Notificaciones y Comunicación</h4>
      <p>
        Al registrarte, aceptas recibir notificaciones por email y en la plataforma relacionadas con
        solicitudes de trabajo, ofertas y actualizaciones del servicio.
      </p>
    </div>

    <div className="space-y-2">
      <h4 className="font-medium">6. Limitación de Responsabilidad</h4>
      <p>No somos responsables por:</p>
      <ul className="list-disc pl-5 space-y-1">
        <li>Daños directos o indirectos derivados del uso del servicio</li>
        <li>Incumplimiento de acuerdos entre usuarios</li>
        <li>Calidad de los trabajos realizados por proveedores</li>
        <li>Interrupciones del servicio por causas ajenas</li>
      </ul>
    </div>

    <div className="space-y-2">
      <h4 className="font-medium">7. Cancelación y Suspensión</h4>
      <p>
        Nos reservamos el derecho de suspender cuentas que violen estos términos o que se utilicen
        de manera fraudulenta. Los usuarios pueden cancelar su cuenta en cualquier momento.
      </p>
    </div>

    <div className="space-y-2">
      <h4 className="font-medium">8. Modificaciones</h4>
      <p>
        Podemos actualizar estos términos periódicamente. Te notificaremos sobre cambios
        significativos a través de la plataforma o por email.
      </p>
    </div>

    <div className="space-y-2">
      <h4 className="font-medium">9. Legislación Aplicable</h4>
      <p>
        Estos términos se rigen por las leyes de [tu país] y cualquier disputa se resolverá en los
        tribunales de [tu ciudad].
      </p>
    </div>
  </div>
);
