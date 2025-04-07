using SmartNotes.Application.DataTransferObjects;

namespace SmartNotes.WebApi.Endpoints
{
    public static class WeatherForecastEndpoints
    {
        public static IEndpointRouteBuilder MapWeatherForecastEndpoints(this IEndpointRouteBuilder routes)
        {
            var group = routes
                .MapGroup("/weatherforecast")
                .WithTags("weatherforecast");

            group.MapGet("/", () =>
                {
                    var forecast = Enumerable.Range(1, 5).Select(index =>
                            new WeatherForecast
                            (
                                DateOnly.FromDateTime(DateTime.Now.AddDays(index)),
                                Random.Shared.Next(-20, 55),
                                _summaries.ElementAt(Random.Shared.Next(_summaries.Count()))
                            ))
                        .ToArray();
                    return forecast;
                })
                .WithName("GetWeatherForecast");

            return routes;
        }
    
        private static readonly IEnumerable<string> _summaries = [
            "Freezing",
            "Bracing",
            "Chilly",
            "Cool",
            "Mild",
            "Warm",
            "Balmy",
            "Hot", 
            "Sweltering",
            "Scorching",
        ];
    }
}