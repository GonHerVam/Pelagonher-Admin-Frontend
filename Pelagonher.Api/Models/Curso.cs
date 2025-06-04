using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;     

namespace Pelagonher.Api.Models
{
    [Table("CURSOS")]
    public class Curso
    {
        [Key] // Primary Key    
        public int ID_CURSO { get; set; }  

        [Required] // Required field
        [StringLength(100)] // Maximum length of  100 characters - Jugar con esto para que prueben los alumnos nombres largos
        public string NOMBRE_CURSO { get; set; }
        public string DESCRIPCION_CURSO { get; set; } // Optional field

        [Required] // Required field
        [StringLength(100)] // Maximum length of  100 characters - Jugar con esto para que prueben los alumnos nombres largos
        public string DURACION { get; set; } // Optional field
        public DateTime FECHA_INICIO { get; set; } // Optional field

        public ICollection<Alumno> Alumnos { get; set; } = new List<Alumno>();// Navigation property for related Alumnos
    }
}
