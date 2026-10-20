export type EstadoMatricula = 'Confirmada' | 'Pendiente' | 'Observada'

export interface Matricula {
  id: number
  estudiante: string
  dni: string
  grado: string
  seccion: string
  estado: EstadoMatricula
}

export const MATRICULAS: Matricula[] = [
  { id: 1, estudiante: 'Quispe Huamán, Luis', dni: '74512036', grado: '1°', seccion: 'A', estado: 'Confirmada' },
  { id: 2, estudiante: 'Ccora Mendoza, Rosa', dni: '75021487', grado: '2°', seccion: 'B', estado: 'Pendiente' },
  { id: 3, estudiante: 'Salazar Torres, Miguel', dni: '73890145', grado: '3°', seccion: 'A', estado: 'Observada' },
  { id: 4, estudiante: 'Huaroc Paucar, Elena', dni: '76214530', grado: '4°', seccion: 'A', estado: 'Confirmada' },
  { id: 5, estudiante: 'Ramos Yauli, Jhon', dni: '72845109', grado: '5°', seccion: 'B', estado: 'Pendiente' },
  { id: 6, estudiante: 'Cárdenas Ayala, Lucía', dni: '74009321', grado: '1°', seccion: 'B', estado: 'Pendiente' },
]

export const VACANTES = [
  { grado: '1° de secundaria', total: 70, ocupadas: 58 },
  { grado: '2° de secundaria', total: 70, ocupadas: 64 },
  { grado: '3° de secundaria', total: 65, ocupadas: 51 },
  { grado: '4° de secundaria', total: 60, ocupadas: 47 },
  { grado: '5° de secundaria', total: 60, ocupadas: 55 },
]

export type RolUsuario = 'Administrador' | 'Personal administrativo' | 'Docente' | 'Estudiante'

export interface Usuario { id: number; nombre: string; usuario: string; rol: RolUsuario; activo: boolean }

export const USUARIOS: Usuario[] = [
  { id: 1, nombre: 'Administrador general', usuario: 'admin', rol: 'Administrador', activo: true },
  { id: 2, nombre: 'Carmen Rojas', usuario: 'crojas', rol: 'Personal administrativo', activo: true },
  { id: 3, nombre: 'Prof. Víctor Lazo', usuario: 'vlazo', rol: 'Docente', activo: true },
  { id: 4, nombre: 'Prof. Ana Quincho', usuario: 'aquincho', rol: 'Docente', activo: false },
  { id: 5, nombre: 'Luis Quispe', usuario: 'lquispe', rol: 'Estudiante', activo: true },
  { id: 6, nombre: 'Rosa Ccora', usuario: 'rccora', rol: 'Estudiante', activo: true },
]

export const ALUMNOS_AULA = [
  'Ayala Pariona, Diego', 'Bendezú Cusi, Mayra', 'Cabezas Rojas, Kevin', 'Ccanto Lapa, Yesenia',
  'Huamán Soto, Brayan', 'Mayta Ñaupa, Daniela', 'Quispe Huamán, Luis', 'Yupanqui Paz, Camila',
]

export const SECCIONES = ['1° A', '2° B', '3° A', '4° A']

export const HORARIO_DEMO = [
  { hora: '08:00 – 08:45', curso: 'Matemática', docente: 'Prof. Víctor Lazo', seccion: '3° A', aula: 'Aula 12' },
  { hora: '08:45 – 09:30', curso: 'Comunicación', docente: 'Prof. Ana Quincho', seccion: '3° A', aula: 'Aula 12' },
  { hora: '09:50 – 10:35', curso: 'Ciencia y Tecnología', docente: 'Prof. Raúl Medina', seccion: '3° A', aula: 'Laboratorio' },
  { hora: '10:35 – 11:20', curso: 'Historia y Geografía', docente: 'Prof. Sonia Vargas', seccion: '3° A', aula: 'Aula 12' },
]
