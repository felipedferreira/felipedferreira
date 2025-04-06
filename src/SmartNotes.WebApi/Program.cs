using Scalar.AspNetCore;
using Serilog;
using SmartNotes.WebApi.Endpoints;

Log.Logger = new LoggerConfiguration()
    .Enrich.FromLogContext()
    .WriteTo.Console()
    .CreateLogger();

try
{
    var builder = WebApplication.CreateBuilder(args);

    builder.Host.UseSerilog();

    // Add services to the container.
    // Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
    builder.Services.AddOpenApi();
    // Add CORS policy that allows everything
    builder.Services.AddCors(options =>
    {
        options.AddPolicy("AllowAll", policy =>
        {
            policy.AllowAnyOrigin()
                .AllowAnyMethod()
                .AllowAnyHeader();
        });
    });

    var app = builder.Build();
    // Logging middleware (built-in from Serilog)
    // <-- logs method, path, status, timing, etc.
    app.UseSerilogRequestLogging();
    
    // Configure the HTTP request pipeline.
    if (builder.Configuration.GetValue<bool>("EnableApiDocumentation"))
    {
        app.MapOpenApi();
        app.MapScalarApiReference("api-docs", (options) =>
        {
            options
                .WithTitle("API Documentation")
                .WithModels(false)
                // .WithLayout(ScalarLayout.Classic)
                .WithTheme(ScalarTheme.Mars);
        });
    }

    app.UseHttpsRedirection();
    app.UseRouting();
    app.UseCors("AllowAll");
    app.MapWeatherForecastEndpoints();

    await app.RunAsync();
}
catch(Exception ex)
{
    Log.Logger.Error(ex, "Unexpected Error has occured on Program.cs");
}
finally
{
    await Log.CloseAndFlushAsync();
}