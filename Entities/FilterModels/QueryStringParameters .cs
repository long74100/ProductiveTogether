using System;
using System.Collections.Generic;
using System.Text;

namespace Entities.FilterModels
{
    public class QueryStringParameters
    {
        const int MaxPageSize = 100;
        public int Page { get; set; } = 1;

        private int _pageSize = 10;
        public int PageSize
        {
            get
            {
                return _pageSize;
            }
            set
            {
                _pageSize = (value > MaxPageSize) ? MaxPageSize : value;
            }
        }
    }
}
