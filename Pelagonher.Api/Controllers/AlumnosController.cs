using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Pelagonher.Api.Data;
using Pelagonher.Api.Models; // Asegúrate de que esta ruta sea correcta para tu modelo Alumno y Curso

namespace Pelagonher.Api.Controllers
{
    [Route("api/[controller]")] // La ruta base será /api/alumnos
    [ApiController]
    public class AlumnosController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public AlumnosController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/Alumnos
        // Obtiene todos los alumnos
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Alumno>>> GetAlumnos()
        {
            // Incluimos el Curso asociado para poder mostrar su nombre en el frontend
            return await _context.Alumnos.Include(a => a.Curso).ToListAsync();
        }

        // GET: api/Alumnos/5
        // Obtiene un alumno por su ID
        [HttpGet("{id}")]
        public async Task<ActionResult<Alumno>> GetAlumno(int id)
        {
            // Incluimos el Curso asociado para el caso de obtener un único alumno
            var alumno = await _context.Alumnos.Include(a => a.Curso).FirstOrDefaultAsync(a => a.ID_ALUMNO == id);

            if (alumno == null)
            {
                return NotFound();
            }

            return alumno;
        }

        // PUT: api/Alumnos/5
        // Actualiza un alumno existente
        [HttpPut("{id}")]
        public async Task<IActionResult> PutAlumno(int id, Alumno alumno)
        {
            if (id != alumno.ID_ALUMNO)
            {
                return BadRequest("El ID del alumno en la URL no coincide con el ID del alumno en el cuerpo de la solicitud.");
            }

            _context.Entry(alumno).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!AlumnoExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Alumnos
        // Crea un nuevo alumno
        [HttpPost]
        public async Task<ActionResult<Alumno>> PostAlumno(Alumno alumno)
        {
            // Validar que el ID_CURSO exista
            if (!await _context.Cursos.AnyAsync(c => c.ID_CURSO == alumno.ID_CURSO))
            {
                return BadRequest($"El ID_CURSO '{alumno.ID_CURSO}' especificado no existe.");
            }

            _context.Alumnos.Add(alumno);
            await _context.SaveChangesAsync();

            // Para devolver el alumno con el objeto Curso cargado, podemos recargarlo o buscarlo de nuevo
            await _context.Entry(alumno).Reference(a => a.Curso).LoadAsync();

            // Retorna 201 Created
            return CreatedAtAction("GetAlumno", new { id = alumno.ID_ALUMNO }, alumno);
        }

        // DELETE: api/Alumnos/5
        // Elimina un alumno
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteAlumno(int id)
        {
            var alumno = await _context.Alumnos.FindAsync(id);
            if (alumno == null)
            {
                return NotFound();
            }

            _context.Alumnos.Remove(alumno);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        // Método auxiliar para verificar si un alumno existe
        private bool AlumnoExists(int id)
        {
            return _context.Alumnos.Any(e => e.ID_ALUMNO == id);
        }
    }
}