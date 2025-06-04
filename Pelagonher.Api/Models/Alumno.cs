using Microsoft.EntityFrameworkCore.Metadata.Internal;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Pelagonher.Api.Models
{
    [Table("ALUMNOS")]
    public class Alumno
    {
        [Key]
        public int ID_ALUMNO { get; set; }

        [Required]
        [StringLength(100)]
        public string NOMBRE { get; set; }

        [Required]
        [StringLength(100)]
        public string APELLIDO { get; set; }

        [Required]
        [StringLength(20)] // Ajusta la longitud según el formato de DNI en Argentina
        public string DNI { get; set; }

        [Required]
        [StringLength(255)]
        [EmailAddress] // Validación básica de formato de correo
        public string CORREO { get; set; }

        // Clave foránea que referencia a Curso
        [ForeignKey("Curso")] // Referencia la clase Curso
        public int ID_CURSO { get; set; }

        // Propiedad de navegación a la entidad Curso
        public Curso Curso { get; set; }
    }
}