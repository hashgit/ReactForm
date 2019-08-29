using System;
using System.Threading.Tasks;
using FormApi.Models;
using FormApi.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace FormApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FormController : ControllerBase
    {
        private readonly IFormService _formService;

        public FormController(IFormService formService)
        {
            _formService = formService;
        }

        // POST api/values
        [HttpPost]
        public async Task<IActionResult> Post([FromBody] Form formValues)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            try
            {
                // it is a simple object so no need to map from ViewModel
                var id = await _formService.SubmitAsync(formValues);
                return Created("", new CreatedModel { Id = id });
            }
            catch (Exception e)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new ErrorModel { Message = e.Message });
            }
            
        }
    }
}