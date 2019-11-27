declare @check_tab table (import_id int, cars_name int, run_km int, import_month_qty tinyint, run_km_more bit);
declare @main_tab table (import_id int, car_id int, cars_name int, run_km int);
declare @cars_maxRun table (car_id int, run_km int);

begin

Insert into @main_tab
Select 
i.Id,
c.Id,
c.cars_name,
i.run_km

from Import_RunCar i
join Cars c on i.car_id = c.id

Insert into @cars_maxRun
select car_id, isnull(max(run_km),0) run 
from RunCar
where car_id in (select car_id from @main_tab)
group by car_id

Insert into @check_tab
Select 
m.import_id,
m.cars_name,
m.run_km,
isnull(count(rc.car_id),0) month_import_qty,
iif(cm.run_km > m.run_km , 0, 1 )

from Cars c
join @main_tab m on m.cars_name = c.cars_name
join @cars_maxRun cm on cm.car_id = m.car_id
left join RunCar rc on rc.car_id = m.car_id
where year(rc.create_date) = year(current_timestamp) 
and month(rc.create_date) = month(current_timestamp)
group by 
m.cars_name,
m.run_km,
cm.run_km,
m.import_id

end
       Select 
	   import_id as Id,
	   cars_name,
	   run_km,
	   import_month_qty,
	   run_km_more
	   from @check_tab
	   
	where
    #filter_columns#
    #sort_columns#
 
offset @pageOffsetRows rows fetch next @pageLimitRows rows only