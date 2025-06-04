using Microsoft.EntityFrameworkCore;
using Pelagonher.Api.Models; // Usamos los modelos definidos.
namespace Pelagonher.Api.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
        }
        // Definimos las tablas del modelo de datos
        public DbSet<Curso> Cursos { get; set; }
        public DbSet<Alumno> Alumnos { get; set; }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // Aquí puedes configurar las relaciones y restricciones adicionales si es necesario.
            base.OnModelCreating(modelBuilder);
            // Ejemplo de configuración de la relación (EF Core a menudo lo infiere)
            modelBuilder.Entity<Alumno>()
                .HasOne(a => a.Curso)       // Un Alumno tiene un Curso
                .WithMany(c => c.Alumnos)   // Un Curso tiene muchos Alumnos
                .HasForeignKey(a => a.ID_CURSO) // La clave foránea en Alumno es ID_CURSO
                .OnDelete(DeleteBehavior.Restrict); // Opcional: No permite eliminar un curso si tiene alumnos asociados

            // Aquí puedes agregar otras configuraciones específicas para tus tablas
            // Por ejemplo, para definir que la descripción puede ser nula
            modelBuilder.Entity<Curso>()
                .Property(c => c.DESCRIPCION_CURSO)
                .IsRequired(false); // Permite que la descripción sea nula - Moificar según sea necesario para los alumnos
        }
    }
}
