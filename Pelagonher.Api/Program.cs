using Pelagonher.Api.Data; // Importa tu DbContext
using Microsoft.EntityFrameworkCore; // Para los métodos de extensión UseMySql o UseNpgsql

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers();

// --- Configuración de Swagger/OpenAPI ---
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(options =>
{
    options.SwaggerDoc("v1", new Microsoft.OpenApi.Models.OpenApiInfo
    {
        Version = "v1", // Puedes cambiar la versión
        Title = "Pelagonher API", // El título que aparecerá
        Description = "Una API para gestionar los recursos de Pelagonher.", // Una descripción
        TermsOfService = new Uri("https://ejemplo.com/terminos"), // Opcional
        Contact = new Microsoft.OpenApi.Models.OpenApiContact // Información de contacto opcional
        {
            Name = "Soporte Pelagonher",
            Email = "soporte@pelagonher.com.ar",
            Url = new Uri("https://pelagonher.com.ar/contacto"),
        },
        License = new Microsoft.OpenApi.Models.OpenApiLicense // Licencia opcional
        {
            Name = "Licencia MIT",
            Url = new Uri("https://opensource.org/licenses/MIT"),
        }
    });
}); // <--- ¡Cierra aquí la configuración de SwaggerGen!

// --- Configuración del DbContext ---
var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");

// Para MySQL:
builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseMySql(connectionString, ServerVersion.AutoDetect(connectionString)));

// Para PostgreSQL (descomenta si usas PostgreSQL y comenta la de MySQL):
// builder.Services.AddDbContext<ApplicationDbContext>(options =>
//        options.UseNpgsql(connectionString));

// --- Fin de la configuración del DbContext ---

// --- Construir la Aplicación ---
var app = builder.Build();

// --- Configurar el HTTP request pipeline. ---
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

// **Añade estas dos líneas para servir archivos estáticos**
app.UseDefaultFiles(); // Permite que index.html sea la página por defecto
app.UseStaticFiles();  // Habilita el servicio de archivos estáticos desde wwwroot


app.UseAuthorization();

app.MapControllers();

app.Run(); // <--- Aquí se mantiene la aplicación escuchando