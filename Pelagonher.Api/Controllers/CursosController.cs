using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Pelagonher.Api.Data;
using Pelagonher.Api.Models; // Asegúrate de que esta ruta sea correcta para tu modelo Curso

namespace Pelagonher.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CursosController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public CursosController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/Cursos
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Curso>>> GetCursos()
        {
            return await _context.Cursos.ToListAsync();
        }

        // GET: api/Cursos/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Curso>> GetCurso(int id)
        {
            var curso = await _context.Cursos.FindAsync(id);

            if (curso == null)
            {
                return NotFound();
            }

            return curso;
        }

        // PUT: api/Cursos/5
        // Para actualizar un curso existente
        [HttpPut("{id}")]
        public async Task<IActionResult> PutCurso(int id, Curso curso)
        {
            // Validar que el ID de la URL coincida con el ID del objeto Curso
            if (id != curso.ID_CURSO)
            {
                return BadRequest("El ID del curso en la URL no coincide con el ID del curso en el cuerpo de la solicitud.");
            }

            // Marcar el estado de la entidad como modificado
            _context.Entry(curso).State = EntityState.Modified;

            try
            {
                // Guardar los cambios en la base de datos
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                // Manejar la excepción si el curso no existe en la base de datos
                if (!CursoExists(id))
                {
                    return NotFound(); // Retorna 404 si el curso no se encuentra
                }
                else
                {
                    throw; // Otra excepción de concurrencia, re-lanzar
                }
            }

            // Retorna 204 No Content para indicar que la actualización fue exitosa sin contenido de retorno
            return NoContent();
        }


        // POST: api/Cursos
        // Para crear un nuevo curso
        [HttpPost]
        public async Task<ActionResult<Curso>> PostCurso(Curso curso)
        {
            _context.Cursos.Add(curso);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetCurso", new { id = curso.ID_CURSO }, curso);
        }

        // DELETE: api/Cursos/5
        // Para eliminar un curso
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCurso(int id)
        {
            var curso = await _context.Cursos.FindAsync(id);
            if (curso == null)
            {
                return NotFound(); // Retorna 404 si el curso no se encuentra
            }

            _context.Cursos.Remove(curso); // Elimina el curso del contexto
            await _context.SaveChangesAsync(); // Guarda los cambios en la base de datos

            return NoContent(); // Retorna 204 No Content para indicar eliminación exitosa
        }

        // Método auxiliar para verificar si un curso existe
        private bool CursoExists(int id)
        {
            return _context.Cursos.Any(e => e.ID_CURSO == id);
        }
    }
}