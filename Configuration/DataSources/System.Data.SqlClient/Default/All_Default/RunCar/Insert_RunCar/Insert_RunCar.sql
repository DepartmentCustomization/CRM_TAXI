declare @info table (Id int);

declare @cars_maxRun table (car_id int, run_km int);
declare @import_filter table (car_id int, run_km int, import_month_qty tinyint, run_km_more bit)

Insert into @cars_maxRun
select car_id, isnull(max(run_km),0) run 
from RunCar
where car_id in (select car_id from Import_RunCar)
group by car_id


Insert into @import_filter
Select 
m.car_id,
m.run_km,
isnull(count(rc.car_id),0) month_import_qty,
iif(m.run_km < cm.run_km, 1, 0 )

from Cars c
join Import_RunCar m on m.car_id = c.Id 
join @cars_maxRun cm on cm.car_id = m.car_id
left join RunCar rc on rc.car_id = m.car_id
where year(rc.create_date) = year(current_timestamp) 
and month(rc.create_date) = month(current_timestamp)
group by 
m.car_id,
m.run_km,
cm.run_km,
m.Id

-- select * from @import_filter


begin
Insert into RunCar ( 
            car_id,
			run_km,
			creator_id,
			create_date,
			editor_id,
			edit_date )
OUTPUT inserted.Id into @info(Id)
Select 
    irc.car_id,
	irc.run_km,
	@user_id,
	getutcdate(),
	@user_id,
	getutcdate()          
    from Import_RunCar irc
	join @import_filter imf on irc.car_id = imf.car_id
	where imf.import_month_qty < 2
	and imf.run_km_more = 0

	select 'Успешно загружено ' + cast(count(Id) as nvarchar(15)) + ' строк в таблицу пробега '  from @info
	end
		delete from Import_RunCar