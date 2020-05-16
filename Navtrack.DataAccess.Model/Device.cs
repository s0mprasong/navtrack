using System.Collections.Generic;
using Navtrack.DataAccess.Model.Common;

namespace Navtrack.DataAccess.Model
{
    public class Device : EntityAudit, IEntity
    {
        public Device()
        {
            Locations = new HashSet<Location>();
            Users = new HashSet<UserDevice>();
        }
        
        public int Id { get; set; }
        public string IMEI { get; set; }
        public string Name { get; set; }
        public Asset Asset { get; set; }
        public int DeviceTypeId { get; set; }
        public ICollection<Location> Locations { get; set; }
        public ICollection<UserDevice> Users { get; set; }
    }
}