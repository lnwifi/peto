import { PawPrint, Heart, Mail } from 'lucide-react'
import { Link } from 'react-router-dom'

export function Footer() {
  return (
    <footer className="bg-carbon text-white/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="bg-primary rounded-xl p-2">
                <PawPrint className="w-6 h-6 text-white" />
              </div>
              <span className="font-nunito font-bold text-xl text-white">
                PetoClub
              </span>
            </div>
            <p className="text-white/60 text-sm max-w-md">
              La comunidad pet-friendly de Argentina. Ayudamos a reunitar mascotas con sus familias, conectamos amantes de los animales y apoyamos a los refugios.
            </p>
            <p className="text-primary text-sm mt-4 flex items-center gap-1">
              <Heart className="w-4 h-4" />
              10% de nuestra ganancia va a refugios
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-semibold text-white mb-4">Navegación</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/mascotas-perdidas" className="hover:text-primary transition">Mascotas Perdidas</Link></li>
              <li><Link to="/tinder" className="hover:text-primary transition">Tinder de Mascotas</Link></li>
              <li><Link to="/adopciones" className="hover:text-primary transition">Adopciones</Link></li>
              <li><Link to="/tienda" className="hover:text-primary transition">Tienda</Link></li>
              <li><Link to="/descuentos" className="hover:text-primary transition">Descuentos</Link></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-semibold text-white mb-4">Legal</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/terminos" className="hover:text-primary transition">Términos de Uso</Link></li>
              <li><Link to="/privacidad" className="hover:text-primary transition">Política de Privacidad</Link></li>
              <li><Link to="/contacto" className="hover:text-primary transition">Contacto</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-white/40 text-sm">
            © 2026 PetoClub. Todos los derechos reservados.
          </p>
          <div className="flex items-center gap-4">
            <a href="mailto:hola@clubpatitas.com" className="text-white/40 hover:text-primary transition">
              <Mail className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
